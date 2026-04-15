import en from '../i18n/en.json';
import es from '../i18n/es.json';
import fr from '../i18n/fr.json';

describe('i18n files', () => {
  it('should exist and be objects', () => {
    expect(typeof en).toBe('object');
    expect(typeof es).toBe('object');
    expect(typeof fr).toBe('object');
  });
});




