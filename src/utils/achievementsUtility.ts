import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetAuthoredCollectionsQuery, useGetCollectionsByUserIdQuery } from "../redux/api/collectionsSlice";
import { useAddAchievementToUserMutation, useGetAchievementsByUserIdQuery, useGetAllAchievementsQuery } from "../redux/api/achievementsSlice";

export const useAchievementService = () => {
	const { userId } = useSelector((state: RootState) => state.userId);

	const { data: achievements } = useGetAllAchievementsQuery();
	const { data: createdCollections } = useGetAuthoredCollectionsQuery(userId);
	const { data: unlockedAchievements } = useGetAchievementsByUserIdQuery(userId);
	const { data: userCollections } = useGetCollectionsByUserIdQuery(userId);

	const [mutate] = useAddAchievementToUserMutation();

	const isAchievementAlreadyUnlocked = (achievementId: number) => {
		return unlockedAchievements?.some(achievement => achievement.id === achievementId);
	};

	const addAchievementToUser = (achievementId: number) => {
		mutate({ userId, achievementId: achievementId });

		const achievement = achievements?.filter(achievement => achievement.id === achievementId);

		// call to endpoint to add the reward to the user avatarlist

		// Code related to ahievementPoints:

		// let totalAchievementPoints = 0;
		// unlockedAchievements?.forEach(achievement => (totalAchievementPoints += achievement.achievementPoints));
		// totalAchievementPoints += achievement[0].achievementPoints;
		// console.log(totalAchievementPoints);

		if (achievement && achievement?.length > 0) {
			return achievement[0];
		}
	};

	const unlockCreateAchievement = () => {
		let achievement = null;

		if (createdCollections) {
			const createdCollectionsCount = createdCollections.length;

			if (createdCollectionsCount + 1 === 1 && !isAchievementAlreadyUnlocked(1)) {
				achievement = addAchievementToUser(1);
			}
			if (createdCollectionsCount + 1 === 3 && !isAchievementAlreadyUnlocked(2)) {
				achievement = addAchievementToUser(2);
			}
			if (createdCollectionsCount + 1 === 5 && !isAchievementAlreadyUnlocked(4)) {
				achievement = addAchievementToUser(4);
			}
			if (createdCollectionsCount + 1 === 10 && !isAchievementAlreadyUnlocked(9)) {
				achievement = addAchievementToUser(9);
			}
		}

		return achievement;
	};

	const unlockCompletedRunsAchievement = () => {
		let achievement = null;
		let completedRuns = 0;

		userCollections?.forEach(collection => (completedRuns += collection.amountOfCompletedRuns));

		if (completedRuns + 1 === 1 && !isAchievementAlreadyUnlocked(10)) {
			achievement = addAchievementToUser(10);
		}
		if (completedRuns + 1 === 5 && !isAchievementAlreadyUnlocked(11)) {
			achievement = addAchievementToUser(11);
		}
		if (completedRuns + 1 === 10 && !isAchievementAlreadyUnlocked(12)) {
			achievement = addAchievementToUser(12);
		}
		if (completedRuns + 1 === 50 && !isAchievementAlreadyUnlocked(13)) {
			achievement = addAchievementToUser(13);
		}

		return achievement;
	};

	const unlockCorrectAnswersAchievement = () => {
		let achievement = null;
		let correctAnswers = 0;

		userCollections?.forEach(collection => (correctAnswers += collection.amountOfCorrectAnswers));

		if (correctAnswers + 1 === 50 && !isAchievementAlreadyUnlocked(7)) {
			achievement = addAchievementToUser(7);
		}
		if (correctAnswers + 1 === 100 && !isAchievementAlreadyUnlocked(6)) {
			achievement = addAchievementToUser(6);
		}
		if (correctAnswers + 1 === 500 && !isAchievementAlreadyUnlocked(5)) {
			achievement = addAchievementToUser(5);
		}
		if (correctAnswers + 1 === 1000 && !isAchievementAlreadyUnlocked(8)) {
			achievement = addAchievementToUser(8);
		}
		if (correctAnswers + 1 === 1500 && !isAchievementAlreadyUnlocked(18)) {
			achievement = addAchievementToUser(18);
		}

		return achievement;
	};

	const unlockInCorrectAnswersAchievement = () => {
		let achievement = null;
		let incorrectAnswers = 0;

		userCollections?.forEach(collection => (incorrectAnswers += collection.amountOfIncorrectAnswers));

		if (incorrectAnswers + 1 === 50 && !isAchievementAlreadyUnlocked(14)) {
			achievement = addAchievementToUser(14);
		}
		if (incorrectAnswers + 1 === 100 && !isAchievementAlreadyUnlocked(15)) {
			achievement = addAchievementToUser(15);
		}
		if (incorrectAnswers + 1 === 250 && !isAchievementAlreadyUnlocked(16)) {
			achievement = addAchievementToUser(16);
		}
		if (incorrectAnswers + 1 === 500 && !isAchievementAlreadyUnlocked(17)) {
			achievement = addAchievementToUser(17);
		}

		return achievement;
	};

	return { unlockCreateAchievement, unlockCompletedRunsAchievement, unlockCorrectAnswersAchievement, unlockInCorrectAnswersAchievement };
};
