pragma solidity ^0.4.19;

contract Inbox {

  mapping (address => Inbox) inboxes;

  struct Inbox {
    Message[] messages;
    // bool unread; //todo
    uint numberSent;
    uint numberRecieved;
    uint8 strikes; //todo
  }

  struct Message {
    address recipient;
    address from;
    string text;
    bool isRead;
    uint readBounty;
    //uint timeToRead;
    uint replyBounty;
    //uint timeToReply
    bool hasReplied;
    bool closed;
  }

  function sendMessage(address _recipient, string _messageText, uint _readBounty, uint _replyBounty) payable {
    Message m;
    m.recipient = _recipient;
    m.text = _messageText;
    m.from = msg.sender;
    if (_readBounty+_replyBounty > msg.value){
      throw;
    }
    m.readBounty = _readBounty;
    m.replyBounty = _replyBounty;
    inboxes[_recipient].messages.push(m);
    inboxes[msg.sender].numberSent++;
    inboxes[_recipient].numberRecieved++;
  }

  function readMessage(uint _mNumber, bool _didReply) {
    //check if message at mNumber is unread,
    require (!inboxes[msg.sender].messages[_mNumber].isRead);
    //mark as read
    inboxes[msg.sender].messages[_mNumber].isRead = true;
    //collect readBounty
    require (!msg.sender.send(inboxes[msg.sender].messages[_mNumber].readBounty));
    //mark hasReplied to _didReply
    if (_didReply){
      inboxes[msg.sender].messages[_mNumber].hasReplied = true;
      //potentially start the clock on collecting the replyBounty
    }
  }

  function confirmReply(address _recipient, uint _mNumber) {
    //pay out recipient at _mNumber if from=sender
    if (inboxes[_recipient].messages[_mNumber].from == msg.sender && !inboxes[_recipient].messages[_mNumber].closed) {
      inboxes[_recipient].messages[_mNumber].closed = true;
      require (_recipient.send(inboxes[_recipient].messages[_mNumber].replyBounty));
    }
  }

  function revokeReadBounty(address _recipient, uint _mNumber) {
    //if not read
    require (!inboxes[_recipient].messages[_mNumber].isRead);
    //set read and reply bounty to 0;
    //withdraw read/reply bounties at the same time;
    require (msg.sender.send(inboxes[_recipient].messages[_mNumber].readBounty+inboxes[_recipient].messages[_mNumber].replyBounty));
    inboxes[_recipient].messages[_mNumber].readBounty = 0;
    inboxes[_recipient].messages[_mNumber].replyBounty = 0;
    inboxes[_recipient].messages[_mNumber].closed = true;
  }

  function revokeReplyBounty(address _recipient, uint _mNumber) {
    //if not replied
    require (!inboxes[_recipient].messages[_mNumber].hasReplied);
    //set reply bounty to 0;
    inboxes[_recipient].messages[_mNumber].replyBounty = 0;
    //withdraw reply bounty;
    require (msg.sender.send(inboxes[_recipient].messages[_mNumber].replyBounty));
  }


  // Accessor Functions

  function getMessage(address _recipient, uint _index) constant returns (address, string, bool, uint, uint, bool, bool) {
    Message m = inboxes[_recipient].messages[_index];
    return (m.from, m.text, m.isRead, m.readBounty, m.replyBounty, m.hasReplied, m.closed);
  }

  function getInbox(address _recipient) constant returns (uint, uint, uint8) {
    return (inboxes[_recipient].numberSent, inboxes[_recipient].numberRecieved, inboxes[_recipient].strikes);
  }
}
