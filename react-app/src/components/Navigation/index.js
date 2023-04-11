import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SideNavBar from '../SideNavBar';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>

			{isLoaded && (
				<li>
					<SideNavBar user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
