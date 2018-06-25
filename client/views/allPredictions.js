Template.allpredictions.helpers({
	currUserRecord: function(){
		let curruser = Meteor.user();
		if(curruser){
			var currRecord = {};
			currRecord.email = curruser.emails[0].address;
			return currRecord;
		}
		return null;
	},
	getMatchList: function(){
		return genericFtns.getMatchListForAll();
	},
	getCombinedVal: function(){
		return [this.team1, this.team2].join("-");
	}
});

Template.allpredictions.events({
	"change select": function(event, template){
		Session.set("currSelection", event.target.value)
	}
});

Template.singleView.helpers({
	getAllPredictions: function(){
		var currSelection = Session.get("currSelection")
		if(currSelection){
			currSelection = currSelection.split("-");
			var query = {
				team1: currSelection[0],
				team2: currSelection[1]
			}
			return MyPredictions.find(query).fetch();
		}
		return;
	},
});