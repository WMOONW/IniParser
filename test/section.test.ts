
import Section from '../lib/Section';

const section = new Section("section1");

section.set('a', 1);
section.set('b', 'b');
section.set('c', [1, 2, 3]);

for (const item of section) {
    console.log('item = ', item);
}

console.log(section.toString());
