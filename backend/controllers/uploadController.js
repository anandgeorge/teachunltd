import AWS from 'aws-sdk';
import fs from 'fs';
import mime from 'mime-types'

AWS.config.update({region: 'ap-south-1'});

const s3 = new AWS.S3({
    accessKeyId: 'AKIA6DIU2I7JRXCM4HW3',
    secretAccessKey: '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'
});

// const BUCKET_NAME = 'www.teachun.ltd';
const BUCKET_NAME = 'app.teachun.ltd';

const uploadFile = (req, res, type, path) => {
	// console.log('In uploadFile', type, path);
	fs.readFile('./' + path, function (err, data) {
	    if (err) { throw err; }

	    let params = {
	        Bucket: BUCKET_NAME,
	        Key: path,
	        Body: data,
			ContentType: 'application/pdf',	    	
	  		ACL:'public-read'
	    }

	    if(type === 'image') {
	    	params['ContentEncoding'] = 'base64';
	    	params['ContentType'] = 'image/jpeg';
	    }
	    else if(type === 'pdf') {
	    	params['ContentType'] = 'application/pdf';	    	
	    }
		else if(type === 'audio') {
			// console.log('Mime type', mime.lookup('./' + path))
			params['ContentType'] = mime.lookup('./' + path)
		}

	    s3.upload(params, function (err, data) {
			res.send('/' + path)
	    	// console.log('Successfully uploaded file.', err, data);
	    })
	});
}

export {
	uploadFile
}
