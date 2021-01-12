import MovieIcon from '@material-ui/icons/Movie';
import KitchenIcon from '@material-ui/icons/Kitchen';
import EventIcon from '@material-ui/icons/Event';
import HomeIcon from '@material-ui/icons/Home';

export const BOTNAV = [
	{
		label: 'Home',
		value: '/',
		icon: <HomeIcon />
	},
	{
		label: 'Phim',
		value: '/films',
		icon: <MovieIcon />
	},
	{
		label: 'Đồ ăn',
		value: '/foods',
		icon: <KitchenIcon />
	},
	{
		label: 'Sự kiện',
		value: '/events',
		icon: <EventIcon />
	}
];
