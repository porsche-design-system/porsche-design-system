import { useLocation, useNavigate } from 'react-router';
import { styleSolutions, styles } from '../routes.tsx';

interface RouteSelectProps {
  className?: string;
}

export function RouteSelect({ className }: RouteSelectProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSolution = pathParts[0] || 'tailwindcss';
  const currentStyle = pathParts[1] || 'blur';

  const handleSolutionChange = (solution: string) => {
    navigate(`/${solution}/${currentStyle}`);
  };

  const handleStyleChange = (style: string) => {
    navigate(`/${currentSolution}/${style}`);
  };

  return (
    <>
      <select
        name="style-solution"
        className={className}
        value={currentSolution}
        onChange={(e) => handleSolutionChange(e.target.value)}
      >
        {styleSolutions.map((solution) => (
          <option key={solution} value={solution}>
            {solution.charAt(0).toUpperCase() + solution.slice(1)}
          </option>
        ))}
      </select>

      <select
        name="style"
        className={className}
        value={currentStyle}
        onChange={(e) => handleStyleChange(e.target.value)}
      >
        {styles.map((solution) => (
          <option key={solution} value={solution}>
            {solution.charAt(0).toUpperCase() + solution.slice(1)}
          </option>
        ))}
      </select>
    </>
  );
}
