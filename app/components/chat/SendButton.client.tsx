import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
import { classNames } from '~/utils/classNames';

interface SendButtonProps {
  show: boolean;
  isStreaming?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onImagesSelected?: (images: File[]) => void;
  position?: 'absolute' | 'inline';
  className?: string;
}

const customEasingFn = cubicBezier(0.4, 0, 0.2, 1);

export const SendButton = ({ show, isStreaming, disabled, onClick, position = 'absolute', className }: SendButtonProps) => {
  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          className={classNames(
            position === 'absolute'
              ? 'absolute top-[18px] right-[22px]'
              : 'relative',
            'flex justify-center items-center p-1.5 rounded-md w-[34px] h-[34px] transition-theme disabled:opacity-50 disabled:cursor-not-allowed',
            'text-[#9b9b9b] hover:text-[#00FFB7] hover:drop-shadow-[0_0_8px_#00FFB7] bg-transparent',
            className,
          )}
          transition={{ ease: customEasingFn, duration: 0.17 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          disabled={disabled}
          onClick={(event) => {
            event.preventDefault();

            if (!disabled) {
              onClick?.(event);
            }
          }}
        >
          <div className="text-lg">
            {!isStreaming ? <div className="i-ph:arrow-right"></div> : <div className="i-ph:stop-circle-bold"></div>}
          </div>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
};
