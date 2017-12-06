import { combineReducers } from "redux"

import getCardStatistics from "./getCardStatisticsReducer"
import getCardValue from "./getCardValueReducer"
import getCardValueThisYear from "./getCardValueThisYearReducer"
import getCardValueTotalHistory from "./getCardValueTotalHistoryReducer"
import getCardValueMonthly from "./getCardValueMonthlyReducer"
import sendLoginRequest from "./sendLoginRequestReducer"
import showScanDetails from "./showScanDetailsReducer"

export default combineReducers({
    getCardStatistics,
    getCardValue,
    getCardValueThisYear,
    getCardValueTotalHistory,
    getCardValueMonthly,
    sendLoginRequest,
    showScanDetails
})