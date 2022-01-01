
import Section from '../lib/Section';

const section = new Section();

section.add('a', 1);
section.add('b', 'b');
section.add('c', [1, 2, 3]);

for (const item of section) {
    console.log('item = ', item);
}
