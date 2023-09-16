import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetAuthoredCollectionsQuery, useGetCollectionsByUserIdQuery } from "../redux/api/collectionsSlice";
import { useAddAchievementToUserMutation, useGetAchievementsByUserIdQuery, useGetAllAchievementsQuery } from "../redux/api/achievementsSlice";
import AchievementTypes from "../types/AchievementTypes";

export const useAchievementService = () => {
	const { userId } = useSelector((state: RootState) => state.userId);

	//const [isAchievementUnlocked, setIsAchievementUnlocked] = useState(false);
	const [achievement, setAchievement] = useState<AchievementTypes | null>(null);

	const { data: achievements } = useGetAllAchievementsQuery();
	const { data: createdCollections } = useGetAuthoredCollectionsQuery(userId);
	const { data: unlockedAchievements } = useGetAchievementsByUserIdQuery(userId);
	const { data: userCollections } = useGetCollectionsByUserIdQuery(userId);

	const [mutate] = useAddAchievementToUserMutation();

	// useEffect(() => {
	// 	if (createdCollections) {
	// 		setCreatedCollectionsCount(createdCollections.length);
	// 		console.log(createdCollections.length);
	// 	}
	// }, [createdCollections]);

	const isAchievementAlreadyUnlocked = (achievementId: number) => {
		return unlockedAchievements?.some(achievement => achievement.id === achievementId);
	};

	const achievementHelper = (achievementId: number) => {
		mutate({ userId, achievementId: achievementId });

		const unlockedAchievement = achievements?.filter(achievement => achievement.id === achievementId);

		if (unlockedAchievement?.length === 1) {
			setAchievement(unlockedAchievement[0]);
			//setIsAchievementUnlocked(true);
		}
	};

	const unlockCreateAchievement = () => {
		if (createdCollections) {
			const createdCollectionsCount = createdCollections.length;

			if (createdCollectionsCount + 1 === 1 && !isAchievementAlreadyUnlocked(1)) {
				achievementHelper(1);
			}
			if (createdCollectionsCount + 1 === 3 && !isAchievementAlreadyUnlocked(2)) {
				achievementHelper(2);
			}
			if (createdCollectionsCount + 1 === 5 && !isAchievementAlreadyUnlocked(4)) {
				achievementHelper(4);
			}
			if (createdCollectionsCount + 1 === 10 && !isAchievementAlreadyUnlocked(9)) {
				achievementHelper(9);
			}
		}

		return achievement;
	};

	const unlockCompletedRunsAchievement = () => {
		let completedRuns = 0;

		userCollections?.forEach(collection => (completedRuns += collection.amountOfCompletedRuns));

		if (completedRuns + 1 === 1 && !isAchievementAlreadyUnlocked(10)) {
			achievementHelper(10);
		}
		if (completedRuns + 1 === 5 && !isAchievementAlreadyUnlocked(11)) {
			achievementHelper(11);
		}
		if (completedRuns + 1 === 10 && !isAchievementAlreadyUnlocked(12)) {
			achievementHelper(12);
		}
		if (completedRuns + 1 === 50 && !isAchievementAlreadyUnlocked(13)) {
			achievementHelper(13);
		}

		return achievement;
	};

	const unlockCorrectAnswersAchievement = () => {
		let correctAnswers = 0;

		userCollections?.forEach(collection => (correctAnswers += collection.amountOfCorrectAnswers));

		if (correctAnswers + 1 === 50 && !isAchievementAlreadyUnlocked(7)) {
			achievementHelper(7);
		}
		if (correctAnswers + 1 === 100 && !isAchievementAlreadyUnlocked(6)) {
			achievementHelper(6);
		}
		if (correctAnswers + 1 === 500 && !isAchievementAlreadyUnlocked(5)) {
			achievementHelper(5);
		}
		if (correctAnswers + 1 === 1000 && !isAchievementAlreadyUnlocked(8)) {
			achievementHelper(8);
		}
		if (correctAnswers + 1 === 1500 && !isAchievementAlreadyUnlocked(18)) {
			achievementHelper(18);
		}

		return achievement;
	};

	const unlockInCorrectAnswersAchievement = () => {
		let incorrectAnswers = 0;

		userCollections?.forEach(collection => (incorrectAnswers += collection.amountOfIncorrectAnswers));

		if (incorrectAnswers + 1 === 50 && !isAchievementAlreadyUnlocked(14)) {
			achievementHelper(14);
		}
		if (incorrectAnswers + 1 === 100 && !isAchievementAlreadyUnlocked(15)) {
			achievementHelper(15);
		}
		if (incorrectAnswers + 1 === 250 && !isAchievementAlreadyUnlocked(16)) {
			achievementHelper(16);
		}
		if (incorrectAnswers + 1 === 500 && !isAchievementAlreadyUnlocked(17)) {
			achievementHelper(17);
		}

		return achievement;
	};

	return { unlockCreateAchievement, unlockCompletedRunsAchievement, unlockCorrectAnswersAchievement, unlockInCorrectAnswersAchievement };
};
