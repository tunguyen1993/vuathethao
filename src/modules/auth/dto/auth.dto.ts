import {IsAlphanumeric, IsEmail, IsFirebasePushId, IsIn, IsNotEmpty, IsNumber, IsString} from 'class-validator';


export class FirebaseLoginDto {

	@IsString()
	@IsNotEmpty()
	readonly firebase_uid: string
}


export class FacebookLoginDto {
	@IsString()
	@IsNotEmpty()
	readonly facebook_token: string
}


export class refreshTokenDto {
	@IsString()
	@IsNotEmpty()
	readonly refresh_token: string
}

export class DefaultLoginDto {
	@IsEmail()
	@IsString()
	@IsNotEmpty()
	readonly email: string
	
	@IsString()
	@IsNotEmpty()
	readonly password: string
}
