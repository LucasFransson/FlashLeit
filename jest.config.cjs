module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'\\.css$': 'identity-obj-proxy',
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};

// setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
// setupFilesAfterEnv: [
// 	require.resolve('@testing-library/jest-dom/extend-expect'),
// ],
