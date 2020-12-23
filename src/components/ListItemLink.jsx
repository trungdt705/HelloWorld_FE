import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default function ListItemLink(props) {
	const { to, name, icon } = props;
	const CustomLink = React.useMemo(
		() =>
			React.forwardRef((linkProps, ref) => {
				return <Link ref={ref} to={to} {...linkProps}></Link>;
			}),
		[to]
	);

	return (
		<li>
			<ListItem button component={CustomLink}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={name} />
			</ListItem>
		</li>
	);
}
