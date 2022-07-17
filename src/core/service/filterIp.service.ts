import { HttpService } from "@nestjs/axios";
import { map } from "rxjs/operators";
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { COUNTRY_CODE_BLOCK } from "../constants";

@Injectable()
export class FilterIpService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager,
  ) {}

  public async filterIp(ip: string): Promise<any> {
    let fake_data = await this.cacheManager.get("FAKE_DATA");
    let storageIp = await this.cacheManager.get(ip.toString());
    if (storageIp === true && fake_data === true) {
      return true;
    }
    return this.httpService
      .get(
        `https://api.ipstack.com/${ip}?access_key=${process.env.ACCESS_TOKEN_API_FILTER_IP}`,
      )
      .pipe(
        map((item) => {
          this.cacheManager
            .set(
              ip.toString(),
              COUNTRY_CODE_BLOCK.includes(item.data.country_code),
              {
                ttl: 0,
              },
            )
            .then((res) => console.log("SAVE TO REDIS " + res));
          console.log(item.data.country_code);
          return (
            item.data &&
            item.data.country_code &&
            COUNTRY_CODE_BLOCK.includes(item.data.country_code) &&
            fake_data === true
          );
        }),
      )
      .toPromise();
  }
}
