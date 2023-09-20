import AchievementCard from "../AchievementCard/AchievementCard";

function AchievementModal({ achievement, closeModal }) {
	return (
		<>
			{achievement && (
				<div onClick={closeModal}>
					<AchievementCard achievement={achievement[0]} avatar={achievement[0]} />
				</div>
			)}
		</>
	);
}

export default AchievementModal;
