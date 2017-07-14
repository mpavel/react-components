import React, { Component } from 'react';

class Day extends Component {
    constructor(props) {
        super(props);

        this.createTimeGroup = this.createTimeGroup.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.handleHoursAdd = this.handleHoursAdd.bind(this);
        this.handleHoursRemove = this.handleHoursRemove.bind(this);
    }

    toggleOpen(e) {
        this.props.onOpenChange(e, this.props.index);
    }

    handleTimeChange(e, i, type) {
        this.props.onTimeChange(e, i, type, this.props.index);
    }

    handleHoursAdd(e) {
        this.props.onHoursAdd(e, this.props.index);
    }

    handleHoursRemove(e, i) {
        this.props.onHoursRemove(e, i, this.props.index);
    }

    createTimeGroup(time, i) {
        let btnRemove = <button onClick={(e) => this.handleHoursRemove(e, i)}>&times;</button>;
        if (i === 0) {
            btnRemove = '';
        }

        return (
            <div key={i.toString()}>
                <label>
                    From
                <input type="text" placeholder="Time" value={time.from}
                        disabled={!this.props.day.open}
                        onChange={(e) => this.handleTimeChange(e, i, 'from')} />
                </label>
                <label>
                    To
                <input type="text" placeholder="Time" value={time.to}
                        disabled={!this.props.day.open}
                        onChange={(e) => this.handleTimeChange(e, i, 'to')} />
                </label>
                {btnRemove}
            </div>
        );
    }

    timeGroups = () => (
        this.props.day.time.map(this.createTimeGroup)
    );

    render() {
        const addHoursDisabled = !(
            this.props.day.open &&
            this.props.day.time.length < 3
        );
        return (
            <div className="day">
                <label>
                    {this.props.day.name}
                    <input type="checkbox" defaultChecked={this.props.day.open} onChange={this.toggleOpen} />
                </label>
                {this.timeGroups()}
                <button onClick={this.handleHoursAdd} disabled={addHoursDisabled}>Add Hours</button>
            </div>
        )
    }
}

class OpeningHours extends Component {
    constructor(props) {
        super(props);

        this.state = {
            days: [
                {
                    name: "Monday",
                    time: [
                        {
                            from: "10:00",
                            to: "12:00",
                        },
                        {
                            from: "14:00",
                            to: "18:00",
                        }
                    ],
                    open: true,
                },
                {
                    name: "Tuesday",
                    time: [
                        { from: "10:00", to: "18:00" },
                    ],
                    open: true,
                },
                {
                    name: "Wednesday",
                    time: [
                        { from: "10:00", to: "18:00" },
                    ],
                    open: true,
                },
                {
                    name: "Thursday",
                    time: [
                        { from: "10:00", to: "18:00" },
                    ],
                    open: true,
                },
                {
                    name: "Friday",
                    time: [
                        { from: "10:00", to: "18:00" },
                    ],
                    open: true,
                },
                {
                    name: "Saturday",
                    time: [
                        { from: "", to: "" },
                    ],
                    open: false,
                },
                {
                    name: "Sunday",
                    time: [
                        { from: "", to: "" },
                    ],
                    open: false,
                },
            ]
        };


        // This binding is necessary to make `this` work in the callback
        this.handleOpenChange = this.handleOpenChange.bind(this);
        this.handleHoursAdd = this.handleHoursAdd.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleHoursRemove = this.handleHoursRemove.bind(this);
    }

    handleOpenChange(e, day) {
        let dayState = Object.assign(
            this.state.days[day],
            {
                time: [
                    { from: "", to: "" },
                ],
                open: !this.state.days[day].open
            }
        );
        let newState = Object.assign(
            {},
            this.state,
            {
                days: [...this.state.days.slice(0, day), dayState, ...this.state.days.slice(day + 1)]
            }
        )
        this.setState(newState);
    }

    handleHoursAdd(e, day) {
        const emptyState = { 'from': '', to: '' };
        let dayState = this.state.days[day];

        if (dayState.time.length >= 3) { return null; }

        dayState['time'].push(emptyState);

        let newState = Object.assign(
            {},
            this.state,
            {
                days: [...this.state.days.slice(0, day), dayState, ...this.state.days.slice(day + 1)]
            }
        );
        this.setState(newState);
    }

    handleTimeChange(e, timeGroup, type, day) {
        // todo: validate time as user types?

        let dayState = this.state.days[day];
        dayState['time'][timeGroup][type] = e.target.value;
        let newState = Object.assign(
            {},
            this.state,
            {
                days: [...this.state.days.slice(0, day), dayState, ...this.state.days.slice(day + 1)]
            }
        );
        this.setState(newState);
    }

    handleHoursRemove(e, timeGroup, day) {
        let dayState = this.state.days[day];
        let timeState = [...dayState.time.slice(0, timeGroup), ...dayState.time.slice(timeGroup + 1)];
        // console.info('hours remove', e, 'timegroup', timeGroup, 'day', day, timeState);
        dayState.time = timeState;
        this.setState(Object.assign(
            {},
            this.state,
            {
                days: [...this.state.days.slice(0, day), dayState, ...this.state.days.slice(day + 1)]
            }
        ));
    }

    render() {
        let _self = this;
        let days = this.state.days.map(function (day, i) {
            return <Day key={i.toString()}
                day={day} index={i}
                onOpenChange={(e, day) => _self.handleOpenChange(e, day)}
                onHoursAdd={_self.handleHoursAdd}
                onHoursRemove={_self.handleHoursRemove}
                onTimeChange={_self.handleTimeChange} />
        });

        return (
            <div>
                {days}
            </div>
        );
    }
}

export default OpeningHours;
