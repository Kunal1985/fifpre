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
	isHighlightR1: function(){
		var sortByType = Session.get("sortByType");
		if(sortByType === "R1")
			return "sortByR1 matchSelect"
		return "sortByR1"
	},
	isHighlightR2: function(){
		var sortByType = Session.get("sortByType");
		if(sortByType === "R2")
			return "sortByR2 matchSelect"
		return "sortByR2"
	},
	isHighlightTotal: function(){
		var sortByType = Session.get("sortByType");
		if(!sortByType || sortByType === "Total")
			return "sortByTotal matchSelect"
		return "sortByTotal"
	}
});

Template.rankings.events({
	"change select": function(event, template){
		Session.set("currSelection", event.target.value)
	},
	"click .sortByR1": function(event, template){
		Session.set("sortByType", "R1");
	},
	"click .sortByR2": function(event, template){
		Session.set("sortByType", "R2");
	},
	"click .sortByTotal": function(event, template){
		Session.set("sortByType", "Total");
	}
});
