import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

interface ErrorMsgProps {
	error: FetchBaseQueryError | SerializedError | undefined;
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({ error }) => {
	let errCode = null;
	let errMsg;
	let errTitle;
	let errDetails;

	if (error) {
		if ("status" in error) {
			// Status is only a property on FetchBaseQueryError
			// This can be a predefined string like 'TIMEOUT_ERROR' or a number
			errCode = error.status;
			// If the status is a string, then a predefined error will be in error.error
			// And when its a number, the response message from our api will be in error.data
			errMsg = "error" in error ? error.error : JSON.stringify(error.data);
			// Uses regular expression to extract the title from errMsg
			const errTitleArray = errMsg.match(/"title"\s*:("([^"]*)")/);
			// Uses regular expression to extract relevant details about the error from errMsg
			errDetails = errMsg.match(/(?<=\[").+?(?="])/);

			if (errTitleArray === null) {
				errTitle = "Something went wrong";
			} else {
				errTitle = errTitleArray[2];
			}
		} else {
			// Message is only a property on SerializedError
			errMsg = error.message;
		}
	}

	return (
		<div>
			{errCode && errTitle ? (
				<>
					<p className="card__text">{errCode}</p>
					<p className="card__text">{errTitle}</p>
					<p className="card__text">{errDetails}</p>
				</>
			) : (
				<p className="card__text">{errMsg}</p>
			)}
		</div>
	);
};

export default ErrorMsg;
