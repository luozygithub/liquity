// SPDX-License-Identifier: MIT

pragma solidity 0.6.11;


/**
 * The purpose of this contract is to hold LUSD tokens for gas compensation:
 * https://github.com/liquity/dev#gas-compensation
 * When a borrower opens a trove, an additional 50 LUSD debt is issued,
 * and 50 LUSD is minted and sent to this contract.
 * When a borrower closes their active trove, this gas compensation is refunded:
 * 50 LUSD is burned from the this contract's balance, and the corresponding
 * 50 LUSD debt on the trove is cancelled.
 * See this issue for more context: https://github.com/liquity/dev/issues/186
 */
/*
*本合同的目的是持有用于气体补偿的LUSD代币:
* https://github.com/liquity/dev gas-compensation
*当借款人打开一个宝库时，额外发行50卢布的债务，
*和50卢布铸成并发送到本合同。
*当借款人关闭他们的活跃宝库时，这种气体补偿将被退还:
*从本合同的余额中扣除50卢布，并相应扣除
*宝藏上的50卢布债务被取消。
*更多内容请参见:https://github.com/liquity/dev/issues/186
*/
contract GasPool {
    // do nothing, as the core contracts have permission to send to and burn from this address
}
