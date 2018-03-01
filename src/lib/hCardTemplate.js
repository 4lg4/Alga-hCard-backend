/**
 * Created by www.Alga.me on 1/3/18.
 */

// reference (http://microformats.org/wiki/hcard)
export default (data)=> {
    const {
        givenName, surname, email, phone,
        houseNumber, street, suburb, state,
        postcode, country, photo
    } = data;

    return `
        <div class="vcard">
            <!-- created by: Alga.me -->
            <span class="fn">${givenName} ${surname}</span>
            ${(photo) ? `<img class="photo" src="${photo}"/>` : ''}
            <a class="email" href="mailto:${email}">${email}</a>
            <div class="tel">${phone}</div>
            <div class="adr">
                <div class="street-address">${houseNumber} ${street}</div>
                <span class="locality">${suburb}</span>,
                <abbr class="region" title="${state}">${state}</abbr>,
                <span class="postal-code">${postcode}</span>
                <div class="country-name">${country}</div>
            </div>
        </div>
    `;
};
