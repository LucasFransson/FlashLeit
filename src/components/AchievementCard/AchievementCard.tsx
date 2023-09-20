import React from "react";
import AchievementTypes from "../../types/AchievementTypes";
import AvatarTypes from "../../types/AvatarTypes";

interface AchievementCardTypes {
	achievement: AchievementTypes;
	avatar: AvatarTypes | null;
}

const AchievementCard: React.FC<AchievementCardTypes> = ({ achievement, avatar }) => {
	return (
		<>
			<div className={"collection-preview"}>
				<div className="collection-preview__card-box">
					<p className="collection-preview__card-box-count purple-foreground">{achievement.achievementPoints}</p>
					<p className="collection-preview__card-box-text purple-foreground">Points</p>
				</div>
				<div className="collection-preview__content purple"></div>
				<h2 className="collection-preview__title">{achievement.title}</h2>
				<p className="collection-preview__description">{achievement.description}</p>
				{avatar && <h2 className="collection-preview__avatar">Yey! You have unlocked a new avatar!</h2>}
			</div>
		</>
	);
};

export default AchievementCard;
