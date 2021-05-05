import React from 'react';
import { shape, string, bool, func } from 'prop-types';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import BillingAddress from '@magento/venia-ui/lib/components/CheckoutPage/BillingAddress';

import { useCashOnDelivery } from '../../talons/useCashOnDelivery';
import defaultClasses from './payment.css';

/**
 * The CashOnDelivery component renders all information to handle cash on delivery payment.
 *
 * @param {String} props.title shop owner payment title.
 * @param {String} props.instructions shop owner post additional content.
 * @param {Boolean} props.shouldSubmit boolean value which represents if a payment nonce request has been submitted
 * @param {Function} props.onPaymentSuccess callback to invoke when the a payment nonce has been generated
 * @param {Function} props.onDropinReady callback to invoke when the braintree dropin component is ready
 * @param {Function} props.onPaymentError callback to invoke when component throws an error
 * @param {Function} props.resetShouldSubmit callback to reset the shouldSubmit flag
 */
const CashOnDelivery = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { resetShouldSubmit, onPaymentSuccess, onPaymentError } = props;
    const toHTML = str => ({ __html: str });

    const {
        title,
        instructions,
        onBillingAddressChangedError,
        onBillingAddressChangedSuccess
    } = useCashOnDelivery({
        resetShouldSubmit,
        onPaymentSuccess,
        onPaymentError
    });

    return (
        <div className={classes.root}>
            <div 
                className={classes.instructions}
                dangerouslySetInnerHTML={toHTML(instructions)}
            />
            <BillingAddress
                shouldSubmit={props.shouldSubmit}
                onBillingAddressChangedError={onBillingAddressChangedError}
                onBillingAddressChangedSuccess={onBillingAddressChangedSuccess}
            />
        </div>
    );
};

CashOnDelivery.propTypes = {
    classes: shape({ root: string }),
    title: string,
    instructions: string,
    shouldSubmit: bool.isRequired,
    onPaymentSuccess: func,
    onDropinReady: func,
    onPaymentError: func,
    resetShouldSubmit: func.isRequired
};

export default CashOnDelivery;
