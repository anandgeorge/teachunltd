import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'
import Content from '../models/contentModel.js'
import User from '../models/userModel.js'

import tt from 'twit-thread'
const { TwitThread } = tt

// async function threader(config, threads) {
//     const t = new TwitThread(config);
//     const twitterThreads = await t.tweetThread(threads);
//     console.log('Twitter threads', JSON.stringify(twitterThreads[0]));
//     let tweetIds = twitterThreads.map(tw => {
//         return tw.id_str
//     })
//     return tweetIds
//   }

const tweetThread = asyncHandler(async (req, res) => {
    const courseId = req.courseId;
    const course = await Course.findById(courseId)
    const ccontents = course.contents
    const userId = course.tutor
    const user = await User.findById(userId);

    if (course) {
        const contents = await Content.find({_id:{$in:ccontents}})
        const qthreads = contents.filter(content => {
            return content.type === 'text' && content.coins === 0
        })
        qthreads.unshift({name:course.name, description:course.description})

        let domain = user.domain || 'app';
        const url = `https://${domain}.teachun.ltd/${course.username}/learn/${course._id}`
        qthreads.push({name:'Link to discourse', description:url})
        console.log('QThreads', qthreads);

        let threadsArr = [];
        qthreads.map(qt => {
            threadsArr.push(qt.name + '\n\n' + qt.description)
        })
        let threads = [];
        threadsArr.map(ta => {
            let taArr = ta.split('.\n\n')
            taArr.map(tr => {
                if(tr.length < 264) {
                    threads.push({text:tr})
                    // console.log('Step 1', tr)
                }
                else {
                    let tnArr = tr.split('\n\n')
                    tnArr.map(tn => {
                        if(tn.length < 265) {
                            threads.push({text:tn + '\n'})
                            // console.log('Step 2', tn)
                        }
                        else {
                            let tadArr = tn.split('. ')
                            let skip = false;
                            tadArr.map((tar, idx) => {
                                if(tar.length < 266) {
                                    if(!skip && tadArr[idx + 1]) {
                                        let curTad = tar + '. ' + tadArr[idx + 1] + '. '
                                        if(curTad.length < 266) {
                                            threads.push({text:curTad})
                                            // console.log('Step 3', curTad)
                                            skip = true
                                        }
                                    }
                                    else if(!skip && !tadArr[idx + 1]) {
                                        threads.push({text:tar})
                                        // console.log('Step 4', tar)
                                    }
                                    else {
                                        skip = false
                                    }
                                }
                                else {
                                    let ttdArr = tar.match(/(.|[\r\n]){1,270}/g);
                                    ttdArr.map(ttd => {
                                        threads.push({text:ttd})
                                        // console.log('Step 5', ttd)
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
        console.log('Threads', JSON.stringify(threads));

        const t = new TwitThread(req.config);
        const twitterThreads = await t.tweetThread(threads);
        console.log('Twitter threads', JSON.stringify(twitterThreads[0]));
        let tweetIds = twitterThreads.map(tw => {
            return tw.id_str
        })

        console.log('TweetIds', tweetIds);
        course.tweets = tweetIds
        await course.save()
        // let tweetIds = ['1370000056603004929','1370000060306575362','1370000063406223366']
        res.status(200).send({tweets: tweetIds});
    } else {
        res.status(404)
        throw new Error('Course not found')
    }
})


export {
   tweetThread
}
