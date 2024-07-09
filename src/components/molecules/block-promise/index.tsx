import Icon, { ICON_SHAPES } from 'components/atoms/icon';
import Image from 'components/atoms/image';
import { mapClassnames, mapModifiers } from 'helpers/components';

export interface BlockPromiseProps {
  className?: string;
  // icon: (typeof ICON_SHAPES)[number];
  icon: string;
  title: React.ReactNode;
}

const BlockPromise: React.FC<BlockPromiseProps> = ({ className: addClass, title, icon }) => {
  const className = mapModifiers('m-block-promise');
  const classNames = mapClassnames(className, addClass);
  return (
    <div className={classNames}>
      {/* <Icon className="m-block-promise__image" iconName={icon} /> */}

      {icon && (
        <Image
          className="m-block-promise__image"
          src={icon}
          modifiers="filled"
          layout="fill"
          objectFit="scale-down"
          objectPosition="center"
          alt="promise item"
        />
      )}

      <h3 className="m-block-promise__title">{title}</h3>
    </div>
  );
};

export default BlockPromise;
