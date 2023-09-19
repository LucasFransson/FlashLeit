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
					<p className="collection-preview__card-box-count">{achievement.achievementPoints} </p>
				</div>
				<div className="collection-preview__content"></div>
				<h2 className="collection-preview__title">{achievement.title}</h2>
				<p className="collection-preview__description">{achievement.description}</p>
				{avatar && <p>"Yey! You have unlocked a new avatar!</p>}
			</div>
		</>
	);
};

export default AchievementCard;
