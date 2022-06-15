import {Injectable, PipeTransform} from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class SharpPipeAvatar implements PipeTransform<Express.Multer.File, Promise<string>> {
	async transform(images: any): Promise<any> {
		let files = []
		images.map(async image => {
			const originalName = path.parse(image.originalname).name;
			const filename = Date.now() + '-' + originalName + '.webp';
			files.push(filename)
			await sharp(image.buffer)
				.resize(800)
				.webp({effort: 3})
				.toFile(path.join('./uploadedFiles/user-avatar', filename));
		})
		return files;
	}
}


@Injectable()
export class SharpPipeUserImage implements PipeTransform<Express.Multer.File, Promise<string>> {
	async transform(images: any): Promise<any> {
		let files = []
		images.map(async image => {
			try{
				const originalName = path.parse(image.originalname).name;
				const filename = Date.now() + '-' + originalName + '.webp';
				files.push(filename)
				await sharp(image.buffer)
					.resize(800)
					.webp({effort: 3})
					.toFile(path.join('./uploadedFiles/images-user', filename));
			}catch (e){
				console.log(e.message)
			}
			
		})
		return files;
	}
}


@Injectable()
export class SharpPipeCampaignImage implements PipeTransform<Express.Multer.File, Promise<string>> {

	async transform(images: any): Promise<any> {
		let files = []
		images.map(async image => {
			const originalName = path.parse(image.originalname).name;
			const filename = Date.now() + '-' + originalName + '.webp';
			files.push(filename)
			await sharp(image.buffer)
				.resize(800)
				.webp({effort: 3})
				.toFile(path.join('./uploadedFiles/images-campaigns', filename));
		})
		return files;
	}
}


@Injectable()
export class SharpPipeVerifyImage implements PipeTransform<Express.Multer.File, Promise<string>> {
	async transform(images: any): Promise<any> {
		let files = []
		images.map(async image => {
			const originalName = path.parse(image.originalname).name;
			const filename = Date.now() + '-' + originalName + '.webp';
			files.push(filename)
			await sharp(image.buffer)
				.rotate()
				.resize(800)
				.webp({effort: 3})
				.toFile(path.join('./uploadedFiles/image-verify', filename));
		})
		return files;
	}
}

@Injectable()
export class SharpPipeEventImage implements PipeTransform<Express.Multer.File, Promise<string>> {
	async transform(images: any): Promise<any> {
		let files = []
		images.map(async image => {
			const originalName = path.parse(image.originalname).name;
			const filename = Date.now() + '-' + originalName + '.webp';
			files.push(filename)
			await sharp(image.buffer)
				.resize(800)
				.webp({effort: 3})
				.toFile(path.join('./uploadedFiles/image-event', filename));
		})
		return files;
	}
}
