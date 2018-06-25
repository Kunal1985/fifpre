Template.rankings.helpers({
	currUserRecord: function(){
		let curruser = Meteor.user();
		if(curruser){
			var currRecord = {};
			currRecord.email = curruser.emails[0].address;
			return currRecord;
		}
		return null;
	},
	getResultsList: function(){
		return genericFtns.calcRankings();
	},
	r2Points: function(){
		if(this.r1Points)
			return this.totalPoints - this.r1Points;
		else
			return 0;	
	}
});

Template.rankings.events({
	"change select": function(event, template){
		Session.set("currSelection", event.target.value)
	}
});