import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import {
  CaptionProps,
  ClassNames,
  DayPicker as ReactDayPicker,
  DayPickerProps as ReactDayPickerProps,
  useDayPicker,
  useNavigation,
} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './day-picker.css';

export type DayPickerProps = ReactDayPickerProps;

/**
 * Small wrapper of `react-day-picker`.
 */
export const DayPicker = (props: DayPickerProps) => (
  <ReactDayPicker {...props} classNames={modifiers} components={components} />
);

const modifiers: ClassNames = {
  day_selected: '!text-primary-500 font-bold',
};

const Caption = ({ id, displayMonth }: CaptionProps) => {
  const {
    locale,
    formatters: { formatCaption },
    labels: { labelPrevious, labelNext },
    onMonthChange,
  } = useDayPicker();
  const { previousMonth, nextMonth, goToMonth } = useNavigation();

  if (!previousMonth && !nextMonth) {
    return null;
  }

  const previousLabel = labelPrevious(previousMonth, { locale });
  const nextLabel = labelNext(nextMonth, { locale });

  const handlePreviousClick = () => {
    if (!previousMonth) {
      return;
    }
    goToMonth(previousMonth);
    onMonthChange?.(previousMonth);
  };

  const handleNextClick = () => {
    if (!nextMonth) {
      return;
    }
    goToMonth(nextMonth);
    onMonthChange?.(nextMonth);
  };

  return (
    <div className="flex justify-between items-center p-2">
      <button
        onClick={handlePreviousClick}
        aria-label={previousLabel}
        disabled={!previousMonth}
        className="p-1"
      >
        <ChevronLeftIcon width={16} height={16} className="text-primary-500" />
      </button>
      <div id={id} className="font-medium">
        {formatCaption(displayMonth, { locale })}
      </div>
      <button
        onClick={handleNextClick}
        aria-label={nextLabel}
        disabled={!nextMonth}
        className="p-1"
      >
        <ChevronRightIcon width={16} height={16} className="text-primary-500" />
      </button>
    </div>
  );
};

const components: ReactDayPickerProps['components'] = {
  Caption: Caption,
};
