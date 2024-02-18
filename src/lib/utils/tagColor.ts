export const toColor = (str: string): string => {
	let hash = 0;

	if (str.length === 0) return '#000000'; // Return black if string is empty

	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0; // Convert to 32bit integer
	}

	// Generate color components from hash
	const r = (hash & 0xff0000) >> 16;
	const g = (hash & 0x00ff00) >> 8;
	const b = hash & 0x0000ff;

	// Ensure the color is not gray
	const isGray = Math.max(r, g, b) - Math.min(r, g, b) < 50;

	// If it's a gray color, tweak one of the components
	if (isGray) {
		const componentIndex = hash % 3;
		if (componentIndex === 0) {
			hash += 51; // Adjust red component
		} else if (componentIndex === 1) {
			hash += 17; // Adjust green component
		} else {
			hash += 34; // Adjust blue component
		}
	}

	// Convert hash to hex color
	const color = '#' + ('00000' + (hash & 0xffffff).toString(16)).slice(-6);

	return color;
};
