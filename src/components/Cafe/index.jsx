import { Children, Component } from "react";
import PropTypes from "prop-types";
import scss from "./Cafe.module.scss";
import buttonScss from "../../globalStyles/buttonStyles.module.scss";

/**
 *  * ButtonControl renders a button with specified properties.
 *
 * @param {Object} props - The properties object.
 * @param {function} props.changeValue - The function to call when the button is clicked.
 * @param {string} props.label - The label to display on the button.
 * @param {string} [props.style] - The CSS class to apply to the button (optional).
 * @param {string} props.name - The name attribute for the button.
 * @returns {JSX.Element} The rendered button component.
 */
const ButtonControl = ({ changeValue, label, style, name }) => (
    <button name={name} className={style} type="button" onClick={changeValue}>
        {label}
    </button>
);

ButtonControl.propTypes = {
    changeValue: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

/**
 * FeedbackOptions renders a set of feedback buttons.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.scssClass - The CSS class to apply to the buttons.
 * @param {function} props.onLeaveFeedback - The function to call when any feedback button is clicked.
 * @returns {JSX.Element} The rendered set of feedback buttons.
 */
const FeedbackOptions = ({ scssClass, onLeaveFeedback }) => (
    <div className={scss.buttons}>
        <ButtonControl style={buttonScss[scssClass]} name={"good"} label="Good" changeValue={onLeaveFeedback} />
        <ButtonControl style={buttonScss[scssClass]} name={"neutral"} label="Neutral" changeValue={onLeaveFeedback} />
        <ButtonControl style={buttonScss[scssClass]} name={"bad"} label="Bad" changeValue={onLeaveFeedback} />
    </div>
);

FeedbackOptions.propTypes = {
    scssClass: PropTypes.string.isRequired,
    onLeaveFeedback: PropTypes.func.isRequired,
};

/**
 * Statistics renders the statistics of feedback.
 *
 * @param {Object} props - The properties object.
 * @param {number} props.good - The number of good feedbacks.
 * @param {number} props.neutral - The number of neutral feedbacks.
 * @param {number} props.bad - The number of bad feedbacks.
 * @param {number} props.total - The total number of feedbacks.
 * @param {number} props.positivePercentage - The percentage of positive feedbacks.
 * @returns {JSX.Element} The rendered statistics.
 */
const Statistics = ({ good, neutral, bad, total, positivePercentage }) => (
    <div >
        <h3>Statistics</h3>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>Total: {total}</p>
        <p>Positive feedback: {positivePercentage}%</p>
    </div>
);

Statistics.propTypes = {
    good: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    positivePercentage: PropTypes.number.isRequired,
};

/**
 * Notification renders a notification message.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.message - The message to display in the notification.
 * @returns {JSX.Element} The rendered notification component.
 */
const Notification = ({ message }) => (
    <div >
        <h3>Statistics</h3>
        <p>{message}</p>
    </div>
);

Notification.propTypes = {
    message: PropTypes.string.isRequired,
};

/**
 * Section component renders a section with a title and children components.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the section.
 * @param {React.ReactNode} props.children - The child components to render within the section.
 * @returns {JSX.Element} The rendered section component.
 */
const Section = ({ title, children }) => (
    <section className={scss.feedbackCard}>
        <h2 className={scss.title}>{title}</h2>
        {children}
    </section>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};

const INITIAL_STATE = {
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    percentage: 0
};

/**
 * Component representing a feedback form.
 * Allows users to submit feedback and displays statistics.
 */
export class Feedback extends Component {
    static propTypes = {
        good: PropTypes.number,
        neutral: PropTypes.number,
        bad: PropTypes.number,
        total: PropTypes.number,
        percentage: PropTypes.number,
        updateValue: PropTypes.func,
    };

    state = {
        ...INITIAL_STATE,
    };

    /**
     * Updates the feedback state based on the clicked rating.
     * @param {Event} evt - Click event.
     */
    updateValue = evt => {
        const { name } = evt.target;
        this.setState(prevState => {
            const newValue = prevState[name] + 1;
            const newTotal = prevState.total + 1;
            const newPercentage = ((prevState.good + (name === 'good' ? 1 : 0)) / newTotal) * 100;

            return {
                [name]: newValue,
                total: newTotal,
                percentage: Number((newTotal > 0 ? newPercentage : 0).toFixed()),
            };
        });
    };

    render() {
        const { good, neutral, bad, total, percentage } = this.state;
        return (
            <>
                <Section title="Please leave feedback" >
                    <FeedbackOptions scssClass={"button-30"} onLeaveFeedback={this.updateValue} />
                    {total === 0 ?
                        <Notification message="There is no feedback" /> :
                        <Statistics good={good} neutral={neutral} bad={bad} total={total} positivePercentage={percentage} />
                    }
                </Section >
            </>
        );
    }
}

