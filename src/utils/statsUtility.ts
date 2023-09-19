import AchievementTypes from "../types/AchievementTypes";
import CardCollectionTypes from "../types/CardCollectionTypes";

export const getAllUserStats = (collections: CardCollectionTypes[]) => {
	let correctAnswers = 0;
	let incorrectAnswers = 0;
	let completedRuns = 0;

	collections?.forEach(collection => (correctAnswers += collection.amountOfCorrectAnswers));
	collections?.forEach(collection => (incorrectAnswers += collection.amountOfIncorrectAnswers));
	collections?.forEach(collection => (completedRuns += collection.amountOfCompletedRuns));

	return [correctAnswers, incorrectAnswers, completedRuns];
};

export const getTotalCorrectAnswers = (collections: CardCollectionTypes[]) => {
	let correctAnswers = 0;

	collections?.forEach(collection => (correctAnswers += collection.amountOfCorrectAnswers));

	return correctAnswers;
};

export const getTotalIncorrectAnswers = (collections: CardCollectionTypes[]) => {
	let incorrectAnswers = 0;

	collections?.forEach(collection => (incorrectAnswers += collection.amountOfIncorrectAnswers));

	return incorrectAnswers;
};

export const getTotalCompleteRuns = (collections: CardCollectionTypes[]) => {
	let completedRuns = 0;

	collections?.forEach(collection => (completedRuns += collection.amountOfCompletedRuns));

	return completedRuns;
};

export const getUserAchievementPoints = (achievements: AchievementTypes[]) => {
	let achievementPoints = 0;

	achievements?.forEach(achievement => (achievementPoints += achievement.achievementPoints));

	return achievementPoints;
};

export const getMaxAchievementPoints = (achievements: AchievementTypes[]) => {
	let maxAchievementPoints = 0;

	achievements?.forEach(achievement => (maxAchievementPoints += achievement.achievementPoints));

	return maxAchievementPoints;
};
