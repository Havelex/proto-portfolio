import type { Chapter, Section, SectionItem } from './types';

export const mockSections: Section[] = [];

for (let i = 1; i <= 10; i++) {
  const section: Section = {
    name: `Section ${i}`,
    items: []
  };

  for (let j = 1; j <= 4; j++) {
    const subsectionItem: SectionItem = {
      name: `Subsection ${j}`,
      href: `#${j}`
    };
    section.items.push(subsectionItem);
  }

  mockSections.push(section);
}

export const mockChapters: Chapter[] = [];

for (let i = 1; i <= 20; i++) {
  const chapter = {
    id: i,
    title: `Chapter ${i}`,
    description: generateLongDescription() // Generating a long description
  };
  mockChapters.push(chapter);
}

function generateLongDescription() {
  const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Integer aliquet convallis libero, eu pretium elit volutpat in. 
  Nullam efficitur turpis vel urna vehicula, eget aliquam sapien ultricies. 
  Sed vitae varius turpis, quis tincidunt risus. Nulla facilisi. 
  Donec sed velit dui. Nam commodo consequat ante, id venenatis nibh tincidunt at. 
  Duis non ipsum ut metus pharetra aliquet. Vestibulum suscipit dui quis ipsum ultricies, 
  vel dictum sapien ullamcorper. Donec sit amet augue vel nisi malesuada pellentesque. 
  Sed nec velit in velit euismod dapibus. Proin fermentum massa sed ante luctus, 
  quis dignissim magna scelerisque. Phasellus gravida nisi et ligula placerat, 
  sed aliquam elit rhoncus. Pellentesque et est aliquet, faucibus ligula et, 
  ultricies urna. Duis eu quam vel nunc commodo eleifend. 
  Curabitur non ex eu leo tristique blandit a at quam. 
  Sed in tellus in ante lobortis maximus et vel purus. 
  Aliquam dignissim sapien vel arcu tincidunt tincidunt. 
  Curabitur tristique libero eget elit mattis vestibulum. 
  Vestibulum fringilla semper mauris nec tincidunt. 
  Mauris a justo at nulla auctor vestibulum. 
  Nunc molestie metus id sapien facilisis, vel posuere nisi varius. 
  Proin vel mauris vel ex gravida rhoncus sit amet sed neque. 
  Proin non urna non mi condimentum efficitur nec non enim. 
  Sed non mi nec libero dignissim sodales at vel metus. 
  Ut id purus id mauris pellentesque facilisis vel ac nisi. 
  Vivamus vel arcu nec nibh finibus tempus. 
  Phasellus luctus enim at aliquam vestibulum. 
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
  Integer ac vehicula leo. Vestibulum euismod orci sit amet lectus fringilla, 
  nec euismod velit consectetur. Phasellus eleifend ultrices lorem, 
  vel venenatis eros tristique nec. Vivamus eget risus vestibulum, 
  feugiat odio nec, sollicitudin tellus. Vestibulum vel mi nec justo tempor ultricies vel sed urna. 
  Fusce eu purus eu tortor convallis cursus id ac mi. 
  Integer nec lectus vel est interdum egestas. Donec vitae dolor eget felis sodales lacinia. 
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
  Aliquam in justo ut mauris euismod eleifend eu sit amet odio. 
  Ut feugiat erat sed nibh convallis efficitur. Donec nec nibh at libero fringilla convallis. 
  Proin fringilla felis vel purus tempus, sit amet scelerisque tortor laoreet. 
  Fusce nec tellus in nisl vehicula sodales. Duis rutrum vehicula erat at maximus. 
  Praesent volutpat massa vitae nibh dignissim, sed hendrerit eros vestibulum. 
  Aliquam erat volutpat. Nam eget ligula nec nisi lacinia feugiat. 
  Ut tincidunt sem eu sapien vehicula, a finibus neque luctus. 
  Curabitur tincidunt est et nisi ultricies, nec convallis risus laoreet. 
  Curabitur vehicula eros a mi molestie, ac sodales mi commodo. 
  Curabitur a felis et odio tempor efficitur. 
  Morbi consectetur mauris vel felis efficitur, id maximus mi luctus. 
  Sed eu purus id sem tempor vestibulum. Nam nec justo non tortor bibendum rhoncus sed et dui.`;

  let description = loremIpsum;

  // Repeat lorem ipsum until length is greater than 1000
  while (description.length <= 1000) {
    description += ` ${loremIpsum}`;
  }

  return description;
}
