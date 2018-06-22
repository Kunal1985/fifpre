Template.myaccount.onRendered(function() {
	let curruser = Meteor.user();
	if(!curruser){
		console.log(curruser, "logged in");
	} else{
		console.log("Not Logged In!")
	}
});

Template.myaccount.helpers({
	currUserRecord: function(){
		let curruser = Meteor.user();
		if(curruser){
			var currRecord = {};
			currRecord.email = curruser.emails[0].address;
			return currRecord;
		}
		return null;
	}
});

Template.myaccount.events({
	"click button": function(){
		console.log("account click button");
	}
});

Template.predictionsView.helpers({
	getAllPredictions: function(){
		let currUserId = Meteor.userId();
		if(currUserId){
			return MyPredictions.find({userId: currUserId}).map(function(doc){
				var actualResult = ActualPredictions.findOne({team1: doc.team1, team2: doc.team2});
				if(actualResult){
					doc.actualResult = [actualResult.goal1, actualResult.goal2].join(" - ");
					doc.basePoints = genericFtns.calcBasePoint(doc, actualResult);
					doc.bonus1 = genericFtns.calcBonus1(doc, actualResult);
					doc.bonus2 = genericFtns.calcBonus2(doc, actualResult);
					doc.totalPoints = doc.basePoints + doc.bonus1 + doc.bonus2;
				}
				else {
					doc.actualResult = "---";
					doc.basePoints = "0";
					doc.bonus1 = "0";
					doc.bonus2 = "0";
					doc.totalPoints = "0";
				}
				return doc;
			});
		}
		return null;
	}
});
