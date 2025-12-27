import { memo, useCallback, useState } from 'react';

import { TypeGuard } from '@/shared/lib';
import { Iconography } from '@/shared/ui';

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(
    document?.documentElement.classList.contains('dark') ?? false,
  );

  const handleToggle = useCallback(() => {
    if (TypeGuard.checkUndefined(document)) {
      return;
    }
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, [darkMode]);

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={darkMode}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-full bg-gray-200 p-2 text-gray-800 transition-colors
                 hover:bg-gray-300 active:bg-gray-400
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {darkMode ? <Iconography.Sun aria-hidden /> : <Iconography.Moon aria-hidden />}
    </button>
  );
};

export default memo(DarkModeButton);
