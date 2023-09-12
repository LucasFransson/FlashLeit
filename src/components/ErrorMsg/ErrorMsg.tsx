import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

interface ErrorMsgProps {
	error: FetchBaseQueryError | SerializedError | undefined;
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({ error }) => {
	let errMsg;
	let errCode = null;

	if (error) {
		if ("status" in error) {
			// Status is only a property on FetchBaseQueryError
			// This can be a predefined string like 'TIMEOUT_ERROR' or a number
			errCode = error.status;
			// If the status is a string, then a predefined error will be in error.error
			// And when its a number, the response message from our api will be in error.data
			errMsg = "error" in error ? error.error : JSON.stringify(error.data);
		} else {
			// Message is only a property on SerializedError
			errMsg = error.message;
		}
	}

	return (
		<div>
			{errCode ? (
				<>
					<p className="card__text">{errCode}</p>
					<p className="card__text">{errMsg}</p>
				</>
			) : (
				<p className="card__text">{errMsg}</p>
			)}
		</div>
	);
};

export default ErrorMsg;
