import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetAuthoredCollectionsQuery, useGetCollectionsByUserIdQuery } from "../redux/api/collectionsSlice";
import { useAddAchievementToUserMutation, useGetAchievementsByUserIdQuery, useGetAllAchievementsQuery } from "../redux/api/achievementsSlice";
import { useAddUserAvatarRelationship } from "./avatarUtilitiy";
import { useGetAllAvatarsQuery } from "../redux/api/avatarsSlice";

export const useAchievementService = () => {
	const { userId } = useSelector((state: RootState) => state.userId);

	const { data: achievements } = useGetAllAchievementsQuery();
	const { data: avatars } = useGetAllAvatarsQuery();
	const { data: createdCollections } = useGetAuthoredCollectionsQuery(userId);
	const { data: unlockedAchievements } = useGetAchievementsByUserIdQuery(userId);
	const { data: userCollections } = useGetCollectionsByUserIdQuery(userId);

	const [mutate] = useAddAchievementToUserMutation();

	const addRelationship = useAddUserAvatarRelationship();

	const isAchievementAlreadyUnlocked = (achievementId: number) => {
		return unlockedAchievements?.some(achievement => achievement.id === achievementId);
	};

	const addAchievementToUser = (achievementId: number, avatarId: number | null) => {
		let avatar = null;

		mutate({ userId: userId, achievementId: achievementId });

		if (avatarId != null) {
			addRelationship(userId, avatarId);
			avatar = avatars?.filter(avatar => avatar.id === avatarId);
		}

		const achievement = achievements?.filter(achievement => achievement.id === achievementId);

		if (achievement && achievement?.length > 0) {
			if (avatar) {
				return [achievement[0], avatar[0]];
			} else {
				return [achievement[0], (avatar = null)];
			}
		}
	};

	const unlockCreateAchievement = () => {
		let achievement = null;

		if (createdCollections) {
			const createdCollectionsCount = createdCollections.length;

			if (createdCollectionsCount + 1 === 1 && !isAchievementAlreadyUnlocked(1)) {
				achievement = addAchievementToUser(1, 6);
			}
			if (createdCollectionsCount + 1 === 3 && !isAchievementAlreadyUnlocked(2)) {
				achievement = addAchievementToUser(2, 7);
			}
			if (createdCollectionsCount + 1 === 5 && !isAchievementAlreadyUnlocked(4)) {
				achievement = addAchievementToUser(4, 8);
			}
			if (createdCollectionsCount + 1 === 10 && !isAchievementAlreadyUnlocked(9)) {
				achievement = addAchievementToUser(9, 9);
			}
		}

		return achievement;
	};

	const unlockCompletedRunsAchievement = () => {
		let achievement = null;
		let completedRuns = 0;

		userCollections?.forEach(collection => (completedRuns += collection.amountOfCompletedRuns));

		if (completedRuns + 1 === 1 && !isAchievementAlreadyUnlocked(10)) {
			achievement = addAchievementToUser(10, 10);
		}
		if (completedRuns + 1 === 5 && !isAchievementAlreadyUnlocked(11)) {
			achievement = addAchievementToUser(11, 11);
		}
		if (completedRuns + 1 === 10 && !isAchievementAlreadyUnlocked(12)) {
			achievement = addAchievementToUser(12, 12);
		}
		if (completedRuns + 1 === 50 && !isAchievementAlreadyUnlocked(13)) {
			achievement = addAchievementToUser(13, 13);
		}

		return achievement;
	};

	const unlockCorrectAnswersAchievement = () => {
		let achievement = null;
		let correctAnswers = 0;

		userCollections?.forEach(collection => (correctAnswers += collection.amountOfCorrectAnswers));

		if (correctAnswers + 1 === 50 && !isAchievementAlreadyUnlocked(7)) {
			achievement = addAchievementToUser(7, 14);
		}
		if (correctAnswers + 1 === 100 && !isAchievementAlreadyUnlocked(6)) {
			achievement = addAchievementToUser(6, 15);
		}
		if (correctAnswers + 1 === 500 && !isAchievementAlreadyUnlocked(5)) {
			achievement = addAchievementToUser(5, 16);
		}
		if (correctAnswers + 1 === 1000 && !isAchievementAlreadyUnlocked(8)) {
			achievement = addAchievementToUser(8, 17);
		}
		if (correctAnswers + 1 === 1500 && !isAchievementAlreadyUnlocked(18)) {
			achievement = addAchievementToUser(18, 18);
		}

		return achievement;
	};

	const unlockInCorrectAnswersAchievement = () => {
		let achievement = null;
		let incorrectAnswers = 0;

		userCollections?.forEach(collection => (incorrectAnswers += collection.amountOfIncorrectAnswers));

		if (incorrectAnswers + 1 === 50 && !isAchievementAlreadyUnlocked(14)) {
			achievement = addAchievementToUser(14, 19);
		}
		if (incorrectAnswers + 1 === 100 && !isAchievementAlreadyUnlocked(15)) {
			achievement = addAchievementToUser(15, 20);
		}
		if (incorrectAnswers + 1 === 250 && !isAchievementAlreadyUnlocked(16)) {
			achievement = addAchievementToUser(16, 21);
		}
		if (incorrectAnswers + 1 === 500 && !isAchievementAlreadyUnlocked(17)) {
			achievement = addAchievementToUser(17, 22);
		}

		return achievement;
	};

	return { unlockCreateAchievement, unlockCompletedRunsAchievement, unlockCorrectAnswersAchievement, unlockInCorrectAnswersAchievement };
};
