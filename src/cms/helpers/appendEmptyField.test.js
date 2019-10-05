import * as k from '%/constants/keywords';
import appendEmptyField from './appendEmptyField';

describe('helpers/appendEmptyField', () => {
  let field, parent;

  const mockState = {
    structure: {
      fields: {
        nestedTest: {
          type: 'string',
        },
      },
    }, 
  };

  beforeEach(() => {
    parent = {};
    field = {
      _name: 'test',
    };
  });

  it('should append a field with value: "" as default', () => {
    appendEmptyField(field, parent, mockState);

    expect(parent).toHaveProperty('test', '');
  });

  it('should append a field with value: false for booleans', () => {
    field.type = k.BOOLEAN;
    appendEmptyField(field, parent, mockState);

    expect(parent).toHaveProperty('test', false);
  });

  it('should append a field with value: [] for tags', () => {
    field.type = k.TAGS;
    appendEmptyField(field, parent, mockState);

    expect(parent).toHaveProperty('test', []);
  });

  it('should append a list of nested fields for lists', () => {
    field.type = k.LIST;
    field.fields = ['nestedTest'];
    field.minItems = 1;
    appendEmptyField(field, parent, mockState);

    expect(parent).toHaveProperty('test');
    expect(parent.test[0]).toHaveProperty('nestedTest', '');
  });

});
