import CakeIcon from "@material-ui/icons/Cake";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import HomeIcon from "@material-ui/icons/Home";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

export const EVENTICON = Object.freeze({
	BIRTHDAY: {
		icon: <CakeIcon color="secondary" />,
	},
	NOEL: {
		icon: <HomeIcon color="primary" />,
	},
	WEDDING: { icon: <FavoriteIcon color="error" /> },
	WORKING: {
		icon: <BusinessCenterIcon color="disabled" />,
	},
	TET: {
		icon: <EmojiEventsIcon style={{ color: "yellow" }} />,
	},
	INDEPENDENT_DAY: {
		icon: <LocalActivityIcon style={{ color: "red" }} />,
	},
});
