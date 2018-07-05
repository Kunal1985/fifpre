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
			team1: "Uruguay",
			team2: "France"
		}, {
			team1: "Brazil",
			team2: "Belgium"
		}, {
			team1: "Sweden",
			team2: "England"
		}, {
			team1: "Russia",
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
	genericFtns.calcWinnerPoints = function(predicted, actual){
    if(predicted.winner == actual.winner)
      return 7;
    return 0;  
  }
	genericFtns.calcETPoints = function(predicted, actual){
		if(predicted.extraTime == "Do Not Predict")
			return 0;
    if(predicted.extraTime == actual.extraTime)
      return 2;
    return -1;  
  }
	genericFtns.calcPTPoints = function(predicted, actual){
		if(predicted.penalties == "Do Not Predict")
			return 0;
    if(predicted.penalties == actual.penalties)
      return 3;
    return -2;  
  }
	genericFtns.calcRankings = function(){
		var results = ActualPredictions.find().fetch();
		var users = []
		for(var i=0; i<results.length; i++){
			var currResult = results[i];
			var rankingArr = MyPredictions.find({team1: currResult.team1, team2: currResult.team2}).map(function(doc){
				var userFound = false;
				var currRanking = {};
				currRanking.userEmail = doc.userEmail;
				switch(currResult.round){
					case "R1": 
						var basePoints = genericFtns.calcBasePoint(doc, currResult);
						var bonus1 = genericFtns.calcBonus1(doc, currResult);
						var bonus2 = genericFtns.calcBonus2(doc, currResult);
						currRanking.totalPoints = basePoints + bonus1 + bonus2;
						currRanking.r1Points = currRanking.totalPoints;
						break;
					case "R2": 	
						var basePoints = genericFtns.calcWinnerPoints(doc, currResult);
						var bonus1 = genericFtns.calcETPoints(doc, currResult);
						var bonus2 = genericFtns.calcPTPoints(doc, currResult);
						currRanking.totalPoints = basePoints + bonus1 + bonus2;
						currRanking.r2Points = currRanking.totalPoints;
						break;
					case "R3": 	
						var basePoints = genericFtns.calcWinnerPoints(doc, currResult);
						var bonus1 = genericFtns.calcETPoints(doc, currResult);
						var bonus2 = genericFtns.calcPTPoints(doc, currResult);
						currRanking.totalPoints = basePoints + bonus1 + bonus2;
						currRanking.r3Points = currRanking.totalPoints;
						break;	
					default: break;	
				}
				users.find(function(currUser){
					if(currUser.userEmail === doc.userEmail){
						if(!currUser.r1Points)
							currUser.r1Points = 0;
						if(!currUser.r2Points)
							currUser.r2Points = 0;
						if(!currUser.r3Points)
							currUser.r3Points = 0;	
						switch(currResult.round){
							case "R1": 
								currUser.r1Points = currUser.r1Points + currRanking.r1Points;
								break;
							case "R2": 	
								currUser.r2Points = currUser.r2Points + currRanking.r2Points;	
								break;
							case "R3": 	
								currUser.r3Points = currUser.r3Points + currRanking.r3Points;	
								break;
							default: break;	
						}								
						currUser.totalPoints = currUser.r1Points + currUser.r2Points + currUser.r3Points;
						userFound = true
					} 
				});
				if(!userFound)
					users.push(currRanking);
				return currRanking;
			});
		}
		var sortByType = Session.get("sortByType");
		switch(sortByType){
			case "R1": 
				users.sort(function(a,b){return b.r1Points - a.r1Points});
				users[0].rankColor = "Row-1";
				if(users[1] === users[2]){
					users[1].rankColor = "Row-2";
					users[2].rankColor = "Row-2";
				} else{
					users[1].rankColor = "Row-2";
					users[2].rankColor = "Row-3";
				}
				break;
			case "R2": 
				users.sort(function(a,b){return b.r2Points - a.r2Points});
				users[0].rankColor = "Row-1";
				users[1].rankColor = "Row-2";
				users[2].rankColor = "Row-3";
				break;
			case "R3": 
				users.sort(function(a,b){return b.r3Points - a.r3Points});
				users[0].color = "Row-1";
				users[1].color = "Row-2";
				users[2].color = "Row-3";
				break;
			default: 
				users.sort(function(a,b){return b.totalPoints - a.totalPoints});
				break;
		}
		return users;
	}
});