import { UNAUTHORIZED } from 'http-status';
import { handleRefreshToken } from './auth';
import { setStatus } from '../features/auth/authSlice';

export function sliceField(field, length) {
	let sliceName = field;
	if (field.length > 30) {
		sliceName = field.slice(0, length);
		sliceName += '...';
	}
	return sliceName;
}

export async function handleUnauthorizeError(error, { getState, dispatch }) {
	if (
		error.response.status === UNAUTHORIZED &&
		getState().auth.refreshStatus === 'idle'
	) {
		dispatch(setStatus('loading'));
		await handleRefreshToken(getState().auth.refreshToken);
		dispatch(setStatus('idle'));
	}
}

module.export = { sliceField, handleUnauthorizeError };
