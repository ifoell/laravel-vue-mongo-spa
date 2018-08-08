import { shallow } from '@vue/test-utils'
import TheNavMenu from '@/components/TheNavMenu.vue';

describe('TheNavMenu.vue', () => {
  it('renders when user is not passed', () => {
    const wrapper = shallow(TheNavMenu, {
      propsData: { user: null },
    });
    expect(wrapper.text()).toMatch('j');
  });
});
