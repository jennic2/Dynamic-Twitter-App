var users = {
    user1: {
        userName: '@elonmusk',
        displayName: 'Elon Musk',
        joinedDate: 'June 2009',
        followingCount: 103,
        followerCount: 47900000,
        avatarURL: 'assets/elonmusk.jpg',
        coverPhotoURL: 'assets/elonmusk-cover.jpeg',
        tweets: [
            {
                text: 'I admit to judging books by their cover',
                timestamp: '6/17/2014 00:01:20'
            },
            {
                text: 'Starship to the moon',
                timestamp: '2/09/2023 18:37:12'
            },
            {
                text: 'Out on launch pad, engine swap underway',
                timestamp: '2/09/2007 12:11:51'
            }
        ]
    },
    user2: {
        userName: '@BillGates',
        displayName: 'Bill Gates',
        joinedDate: 'June 2009',
        followingCount: 274,
        followerCount: 53800000,
        avatarURL: 'assets/billgates.jpg',
        coverPhotoURL: 'assets/billgates-cover.jpeg',
        tweets: [
            {
                text: 'Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/',
                timestamp: '2/10/2024 00:01:20'
            },
            {
                text: 'Should I start tweeting memes? Let me know in a comment.',
                timestamp: '2/09/2006 18:37:12'
            },
            {
                text: 'In 2020, I read a book every hour.',
                timestamp: '2/09/2012 12:11:51'
            }
        ]
    },
    user3: {
        userName: '@NicoJC',
        displayName: 'Niccolo Jensen-Connel',
        joinedDate: 'June 2009',
        followingCount: 11,
        followerCount: 8,
        avatarURL: 'assets/my-profile-pic.jpg',
        coverPhotoURL: 'assets/my-cover-photo.jpg',
        tweets: [
            {
                text: 'Why are we still here? Just to get riggidy riggidy rekt?',
                timestamp: '6/17/2024 00:01:20'
            },
            {
                text: 'It is better to be feared than to be loved, if one cannot be both',
                timestamp: '6/16/2024 18:37:12'
            },
            {
                text: 'What is it with these motherfucking snakes in this motherfucking tomb!?',
                timestamp: '6/15/2017 12:11:51'
            },
            {
                text: 'Snakes? Why does it always have to be snakes?!',
                timestamp: '6/15/2017 12:12:51'
            },
            {
                text: 'Snake? Snake?! SNAAAAAAAAAAAAKE?!?!?!',
                timestamp: '6/15/2017 12:13:51'
            }
        ]
    }
};

function numberSimplifier(num) { 
    if(num < 1000) {
        return num;
    }
    numDivBy1k = num / 1000;
    if(numDivBy1k > 1 && numDivBy1k < 1000) {
        numDivBy1k = parseFloat(numDivBy1k);
        return `${parseFloat(numDivBy1k.toFixed(2))}k`;
    }
    numDivBy1M = num / 1000000;
    return `${parseFloat(numDivBy1M.toFixed(2))}M`;
}

function timeSince(stringTime) {
    let stringArr = stringTime.split(" ");
    let dateArr = stringArr[0].split("/");
    if(dateArr[0].length === 1) {
        dateArr[0] = "0" + dateArr[0];
    }
    if(dateArr[1].length === 1) {
        dateArr[1] = "0" + dateArr[1];
    }
    let year = dateArr[2];
    let month = dateArr[0];
    let day = dateArr[1];
    let newDateStr = year + "-" + month + "-" + day;
    stringArr[1] = "T" + stringArr[1];
    let newTimeString = newDateStr + stringArr[1];
    const date = new Date(newTimeString);
    const timeSinceInSeconds = ((Date.now() - date.getTime()) / 1000).toFixed();
    if(timeSinceInSeconds < 60) {
        return "1m";
    }
    else if(timeSinceInSeconds < 60 * 60) {
        return `${Math.floor(timeSinceInSeconds / 60)}m`;
    }
    else if(timeSinceInSeconds < 60 * 60 * 24) {
        return `${Math.floor(timeSinceInSeconds / (60 * 60))}h`;
    }
    else {
        let unTwitteredDate = date.toDateString();
        let unTwitteredDateArr = unTwitteredDate.split(" ");
        let TwitterDate = unTwitteredDateArr[1] + " " + unTwitteredDateArr[2] + ", " + unTwitteredDateArr[3];
        return TwitterDate;
    }
}

function getDateTime(stringTime) {
    let stringArr = stringTime.split(" ");
    let dateArr = stringArr[0].split("/");
    if(dateArr[0].length === 1) {
        dateArr[0] = "0" + dateArr[0];
    }
    if(dateArr[1].length === 1) {
        dateArr[1] = "0" + dateArr[1];
    }
    let year = dateArr[2];
    let month = dateArr[0];
    let day = dateArr[1];
    let newDateStr = year + "-" + month + "-" + day;
    stringArr[1] = "T" + stringArr[1];
    let newTimeString = newDateStr + stringArr[1];
    let newDate = new Date(newTimeString);
    return newDate.getTime();
}

function compareNumbers(a, b) {
    return a - b;
}

function getTweetDatawithDateTime(dateTime) {
    for(let user in users) {
        for(i = 0; i < users[user].tweets.length; i++) {
            if(dateTime === getDateTime(users[user].tweets[i].timestamp)) {
                return [users[user], users[user].tweets[i]];
            }
        }
    }
}

let orderedTweetTimesArray = [];
for(let user in users) {
    for(i = 0; i < users[user].tweets.length; i++) {
        orderedTweetTimesArray.push(getDateTime(users[user].tweets[i].timestamp));
    }
}

orderedTweetTimesArray.sort(compareNumbers);

let tweetsDiv = document.querySelector(".tweets");
for(let i = 0; i < orderedTweetTimesArray.length; i++) {
    let curTweetDiv = document.createElement("div");
    let curTweetDataArr = getTweetDatawithDateTime(orderedTweetTimesArray[i]);
    curTweetDiv.innerHTML = 
                        `<div class="tweet">
                            <div class="tweet-profile-img-container">
                                <img src="${curTweetDataArr[0].avatarURL}" class="profile-img profile-img-tweet">
                            </div>
                            <div class="tweet-content-container">
                                <span style="display: flex; text-align: center;">
                                    <h5 style="padding-right: 2px;">${curTweetDataArr[0].displayName}</h5>
                                    <img src="assets/Twitter-verified-badge.png" style="width: 17px;">
                                    <p style="font-size: 12px; color: #8b8f8b; padding-left: 2px;">${curTweetDataArr[0].userName} <span style="font-weight: 600;">·</span> ${timeSince(curTweetDataArr[1].timestamp)}</p>
                                </span>
                                <p style="font-size: 14px;">${curTweetDataArr[1].text}</p>
                                <div class="tweet-btns-container">
                                    <button type="button" class="btn tweet-topbar-btn tweet-btns" style="text-align: left;">
                                        <img src="assets/comment.png" style="width: 16px;  display: inline-block; margin-bottom: -3px; margin-right: 10px;">0
                                    </button>
                                    <button type="button" class="btn tweet-topbar-btn tweet-btns" style="text-align: left;">
                                        <img src="assets/retweet-icon.png" style="width: 16px;  display: inline-block; margin-bottom: -3px; margin-right: 10px;">0
                                    </button>
                                    <button type="button" class="btn tweet-topbar-btn tweet-btns" style="text-align: left;">
                                        <img src="assets/heart.png" style="width: 16px;  display: inline-block; margin-bottom: -3px; margin-right: 10px;">0
                                    </button>                        <button type="button" class="btn tweet-topbar-btn tweet-btns" style="text-align: left;">
                                        <img src="assets/upload-icon.png" style="width: 16px;  display: inline-block; margin-bottom: -3px; margin-right: 10px;">
                                    </button>
                                </div>
                            </div>
                        </div>`
    tweetsDiv.appendChild(curTweetDiv);
}