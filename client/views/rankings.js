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
	}
});

Template.rankings.events({
	"change select": function(event, template){
		Session.set("currSelection", event.target.value)
	}
});
