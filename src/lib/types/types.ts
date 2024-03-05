export type File = {
	name: string;
	type: string;
	meta: {
		size: number;
		lineCount: number;
		symbolCount: number;
	};
	lastModified: Date;
	parent?: Directory;
};

export type Directory = {
	name: string;
	parent?: Directory;
	files: File[];
	subdirectories: Directory[];
};

export type Chapter = {
	id: number;
	title: string;
	description: string;
};

export type Metadata = {
	title: string;
	section?: string;
	tags?: string[];
	date?: string;
};

export type Section = {
	name: string;
	items: { path: string; metadata: Metadata }[];
};
