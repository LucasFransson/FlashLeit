import jwtDecode from "jwt-decode";

export const getUserIdFromIdToken = (idToken: string) => {
	try {
		const claims = JSON.stringify(jwtDecode(idToken));
		const userIdClaim = claims.match(/"extension_UserId"\s*:\s*(\d+)/);

		if (userIdClaim == null) throw new Error("The regExArray UserIdClaim is null.");
		let userId: RegExpMatchArray | null | number = userIdClaim[0].match(/\d+/);

		if (userId == null) throw new Error("The regExArray UserId is null.");
		userId = Number(userId[0]);

		if (isNaN(userId)) throw new Error("The string could not be converted to a number.");
		return userId;
	} catch (error) {
		console.error(error);
	}
};
