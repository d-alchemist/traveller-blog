import React from 'react';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import ShareIcon from '@material-ui/icons/Share';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
	content: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	details: {
		display: 'flex',
		flexDirection: 'row',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
		},
	},
	typeContent: {
		marginTop: '2.5rem',
	},
	shareActions: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingLeft: '16px',
	},
	avatarArea: {
		display: 'flex',
		alignItems: 'center',
	},
	avatarDetails: {
		marginLeft: '.5rem',
	},
	avatarHeading: {
		fontSize: '1rem',
		color: '#454545',
		fontWeight: 400,
	},
	avatarSub: {
		fontSize: '.7rem',
		color: '#6a6c6a',
	},
	blogTitle: {
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		width: '20rem',
		cursor: 'pointer',

		'&:hover': {
			color: '#6a6c6a',
		},
	},
	blogContent: {
		display: 'block',
		textOverflow: 'ellipsis',
		wordWrap: 'break-word',
		overflow: 'hidden',
		maxHeight: '4rem',
	},
}));

CardComponent.propTypes = {
	allPosts: propTypes.object,
};

export default function CardComponent({ allPosts }) {
	const classes = useStyles();
	const router = useRouter();

	return (
		<Card className={classes.root}>
			<div className={classes.details}>
				<CardMedia
					component="img"
					alt="lorem image"
					height="250"
					image="https://picsum.photos/200/250"
					title="Contemplative Reptile"
				/>
				<div className={classes.content}>
					<CardContent className={classes.typeContent}>
						<Typography
							gutterBottom
							variant="h5"
							component="h2"
							onClick={() => router.push(`/posts/${allPosts.id}`)}
							className={classes.blogTitle}
						>
							{allPosts.title}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className={classes.blogContent}
						>
							{allPosts.content.slice(0, 100)}
						</Typography>
					</CardContent>
					<CardActions disableSpacing className={classes.shareActions}>
						<Box component="div">
							<div className={classes.avatarArea}>
								<Avatar alt="Remy Sharp">
									{allPosts.user.username.split('')[0]}
								</Avatar>
								<div className={classes.avatarDetails}>
									<Typography
										variant="h6"
										className={classes.avatarHeading}
									>
										{allPosts.user.username}
									</Typography>
									<Typography
										variant="body1"
										gutterBottom
										className={classes.avatarSub}
									>
										{allPosts.created_at.split(' ')[0]} - 20min read
									</Typography>
								</div>
							</div>
						</Box>
						<IconButton aria-label="share">
							<Tooltip title="Share">
								<ShareIcon />
							</Tooltip>
						</IconButton>
					</CardActions>
				</div>
			</div>
		</Card>
	);
}
