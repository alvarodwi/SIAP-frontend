/* eslint-disable */
// @ts-ignore
import { withMaterialColors } from 'tailwind-material-colors'

module.exports = withMaterialColors(
	// tailwind config
	{
		darkMode: 'class',
		content: ['./src/**/*.{html,js}'],
		theme: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			fontSize: {
				'display-lg': ['57px', '64px'],
				'display-md': ['45px', '52px'],
				'display-sm': ['36px', '44px'],
				'headline-lg': ['32px', '40px'],
				'headline-md': ['28px', '36px'],
				'headline-sm': ['24px', '32px'],
				'title-lg': ['22px', '28px'],
				'title-md': ['16px', '24px'],
				'title-sm': ['14px', '20px'],
				'body-lg': ['16px', '24px'],
				'body-md': ['14px', '20px'],
				'body-sm': ['12px', '16px'],
				'label-lg': ['14px', '20px'],
				'label-md': ['12px', '16px'],
				'label-sm': ['11px', '16px'],
			},
			extend: {
				spacing: {
					'8xl': '96rem',
					'9xl': '128rem',
				},
				borderRadius: {
					'4xl': '2rem',
				},
			},
		},
	},
	// base colors
	{
		primary: '#005E7D',
		secondary: '#337E92',
		tertiary: '#30394B',
		error: '#FC6D78',
		neutral: '#4D4D4D',
		neutralVariant: '#4D4D4D',
	}
)
