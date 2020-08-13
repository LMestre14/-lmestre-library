import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import valid from 'card-validator';

import { Prop } from './type';
import { Cards, Gradients } from './utils';

export default class CreditCard extends PureComponent<Prop> {
	static defaultProps = {
		hide: true,
		gaps: true,
		cardHolder: 'John Doe',
		number: '4111111111111111',
	};

	card = null as any;
	gaps = [4, 8, 16] as Array<number>;
	cardType = 'placeholder' as string;

	constructor(props: any) {
		super(props);

		const { card, isPotentiallyValid, isValid } = valid.number(props.number);

		if (!isValid || !isPotentiallyValid) return;

		this.cardType = card?.type || 'placeholder';
		this.card = card;
		this.gaps = card?.gaps || [4, 8, 16];
	}

	get gradient() {
		return Gradients[this.cardType] || Gradients.visa;
	}

	get brand() {
		return Cards[this.cardType] || Cards.placeholder;
	}

	get numbers() {
		const { number } = this.props;
		const offsets = [0].concat(this.gaps).concat([String(number).length]);

		return offsets.map(this.setNumber).filter((p) => p !== '');
	}

	setNumber = (end: number, index: number, offsets: Array<number>) => {
		const { number, hide } = this.props;
		if (index === 0) return '';
		const start = offsets[index - 1];
		const n = String(number).substr(start, end - start);
		if (!hide || index === offsets.length - 1) return n;
		return Array(n.length).fill('•').join('');
	};

	renderNumber = () => {
		const { gaps } = this.props;

		if (!gaps) {
			const text = this.numbers.join(' ');
			return <Text style={Styles.number}>{text}</Text>;
		}

		return (
			<View style={Styles.gapContainer}>
				{this.numbers.map((n, i) => (
					<React.Fragment key={`number_${n}_${i}`}>
						{i !== 0 && <View style={Styles.gap} />}
						<Text style={Styles.number}>{n}</Text>
					</React.Fragment>
				))}
			</View>
		);
	};

	render() {
		const { cardHolder } = this.props;
		return (
			<LinearGradient style={Styles.root} colors={this.gradient} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
				<Text style={Styles.type}>Credit</Text>
				<Image style={Styles.brand} source={this.brand} />
				<Text style={Styles.cardHolder}>{cardHolder}</Text>
				{this.renderNumber()}
			</LinearGradient>
		);
	}
}

const Styles = StyleSheet.create({
	root: {
		width: 295,
		height: 174,
		borderRadius: 16,
		paddingHorizontal: 20,
		paddingVertical: 22,
	},

	topInfo: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	type: {
		flex: 1,
		fontSize: 16,
		color: 'white',
	},

	gap: {
		height: StyleSheet.hairlineWidth,
		width: 6,
		backgroundColor: 'white',
		alignSelf: 'center',
		marginHorizontal: 8,
	},

	gapContainer: {
		flexDirection: 'row',
	},

	brand: {
		position: 'absolute',
		top: 20,
		right: 20,
		height: 30,
		width: 50,
		resizeMode: 'contain',
	},

	cardHolder: {
		fontSize: 14,
		color: 'white',
		opacity: 0.8,
		marginBottom: 5,
	},

	number: {
		fontSize: 16,
		color: 'white',
	},
});
