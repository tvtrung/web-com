import { mapClassnames, mapModifiers, ModifierProp } from 'helpers/components';
import parse from 'html-react-parser';

interface JobTitleProps {
  className?: string;
  title: string;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  modifiers?: ModifierProp<'selectable' | 'active'>;
}

const JobTitle: React.FC<JobTitleProps> = ({ className: addClass, title, onClick, modifiers }) => {
  const className = mapModifiers('a-job-title', modifiers);
  const classNames = mapClassnames(className, addClass);
  return (
    <span className={classNames} onClick={e => onClick && onClick(e)}>
      {parse(title)}
    </span>
  );
};

export default JobTitle;
