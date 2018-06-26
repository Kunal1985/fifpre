Template.registerHelper("getName", function(name) {
	return "Hello " + name;
});

Template.registerHelper("getName2", function(name) {
	return "Gello " + name + " " + Blaze._globalHelpers["getName"](name);
});

Template.registerHelper("getName3", function(name) {
	return "Pello " + UI._globalHelpers.getName2(name);
});

Meteor.startup(function () {
  genericFtns = {};
  genericFtns.getMatchList = function(){
    return [{
			team1: "Australia",
			team2: "Peru"
		}, {
			team1: "Denmark",
			team2: "France"
		}, {
			team1: "Nigeria",
			team2: "Argentina"
		}, {
			team1: "Iceland",
			team2: "Croatia"
		}];
	}
	genericFtns.getMatchListForAll = function(){
		var matchList = genericFtns.getMatchList();
		var matchViewList = [];
		for(var i=0; i<matchList.length; i++){
			var currMatch = matchList[i];
			var resultsUplaoded = ActualPredictions.findOne({team1: currMatch.team1, team2: currMatch.team2})
			if(resultsUplaoded)
				matchViewList.push(currMatch);
		}
    return matchViewList;
  }
	genericFtns.calcBasePoint = function(predicted, actual){
		var result = genericFtns.getResult(actual.goal1 - actual.goal2);
		var predicted = genericFtns.getResult(predicted.goal1 - predicted.goal2);
		if(result === predicted)
			return 3;
		return 0;	
	}
	genericFtns.getResult = function(result){
		if(result > 0)
			return "W";
		if(result < 0)
			return "L";
		return "D";
  }
  genericFtns.calcBonus1 = function(predicted, actual){
    if(predicted.goal1 == actual.goal1 && predicted.goal2 == actual.goal2)
      return 2;
    return 0;  
  }
  genericFtns.calcBonus2 = function(predicted, actual){
    if((predicted.goal1-predicted.goal2) == (actual.goal1-actual.goal2))
      return 1;
    return 0;  
	}
	genericFtns.calcRankings = function(){
		var results = ActualPredictions.find().fetch();
		var users = []
		for(var i=0; i<results.length; i++){
			var currResult = results[i];
			var rankingArr = MyPredictions.find({team1: currResult.team1, team2: currResult.team2}).map(function(doc){
				var userFound = false;
				var currRanking = {};
				var basePoints = genericFtns.calcBasePoint(doc, currResult);
				var bonus1 = genericFtns.calcBonus1(doc, currResult);
				var bonus2 = genericFtns.calcBonus2(doc, currResult);
				currRanking.userEmail = doc.userEmail;
				currRanking.totalPoints = basePoints + bonus1 + bonus2;
				if(doc.round === "R1")
					currRanking.r1Points = currRanking.totalPoints;
				users.find(function(currUser){
					if(currUser.userEmail === doc.userEmail){
						if(!currUser.r1Points)
							currUser.r1Points = 0;
						if(doc.round === "R1")
							currUser.r1Points = currUser.r1Points + currRanking.r1Points;
						currUser.totalPoints = currUser.totalPoints + currRanking.totalPoints;
						userFound = true
					} 
				});
				if(!userFound)
					users.push(currRanking);
				return currRanking;
			});
		}
		users.sort(function(a,b){return b.totalPoints - a.totalPoints});
		return users;
	}
});