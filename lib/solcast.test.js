'use strict';

const { expect } = require('chai');
const solcast = require('../lib/solcast');

describe('Test Solcast Converter', () => {
    it('convert solcast data UTC 0', () => {
        const data = {
            forecasts: [
                {
                    pv_estimate: 0.959,
                    period_end: '2022-05-23T07:30:00.0000000Z',
                    period: 'PT30M',
                },
                {
                    pv_estimate: 1.205,
                    period_end: '2022-05-23T08:00:00.0000000Z',
                    period: 'PT30M',
                },
                {
                    pv_estimate: 1.077,
                    period_end: '2022-05-23T08:30:00.0000000Z',
                    period: 'PT30M',
                },
            ],
        };

        const converted = solcast.convertToForecast(data, 0);

        expect(converted).to.be.an('object');
        expect(converted).to.have.own.property('watts');
        expect(converted).to.have.own.property('watt_hours_period');
        expect(converted).to.have.own.property('watt_hours');
        expect(converted).to.have.own.property('watt_hours_day');

        expect(converted.watts).to.be.an('object');
        expect(converted.watt_hours_period).to.be.an('object');
        expect(converted.watt_hours).to.be.an('object');
        expect(converted.watt_hours_day).to.be.an('object');

        expect(converted.watts).to.have.own.property('2022-05-23 07:30:00');
        expect(converted.watts['2022-05-23 07:30:00']).to.be.equal(959); // * 1000
    });

    it('convert solcast data UTC +2', () => {
        const data = {
            forecasts: [
                {
                    pv_estimate: 0.959,
                    period_end: '2022-05-23T07:30:00.0000000Z',
                    period: 'PT30M',
                },
                {
                    pv_estimate: 1.205,
                    period_end: '2022-05-23T08:00:00.0000000Z',
                    period: 'PT30M',
                },
                {
                    pv_estimate: 1.077,
                    period_end: '2022-05-23T08:30:00.0000000Z',
                    period: 'PT30M',
                },
            ],
        };

        const converted = solcast.convertToForecast(data, 2);

        expect(converted).to.be.an('object');
        expect(converted).to.have.own.property('watts');
        expect(converted).to.have.own.property('watt_hours_period');
        expect(converted).to.have.own.property('watt_hours');
        expect(converted).to.have.own.property('watt_hours_day');

        expect(converted.watts).to.be.an('object');
        expect(converted.watt_hours_period).to.be.an('object');
        expect(converted.watt_hours).to.be.an('object');
        expect(converted.watt_hours_day).to.be.an('object');

        expect(converted.watts).to.have.own.property('2022-05-23 09:30:00');
        expect(converted.watts['2022-05-23 09:30:00']).to.be.equal(959); // * 1000
    });
});
