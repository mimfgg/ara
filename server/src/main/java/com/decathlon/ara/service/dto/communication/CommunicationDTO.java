/******************************************************************************
 * Copyright (C) 2019 by the ARA Contributors                                 *
 *                                                                            *
 * Licensed under the Apache License, Version 2.0 (the "License");            *
 * you may not use this file except in compliance with the License.           *
 * You may obtain a copy of the License at                                    *
 *                                                                            *
 * 	 http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                            *
 * Unless required by applicable law or agreed to in writing, software        *
 * distributed under the License is distributed on an "AS IS" BASIS,          *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.   *
 * See the License for the specific language governing permissions and        *
 * limitations under the License.                                             *
 *                                                                            *
 ******************************************************************************/

package com.decathlon.ara.service.dto.communication;

import com.decathlon.ara.domain.enumeration.CommunicationType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Wither;

import static com.decathlon.ara.service.support.DtoConstants.CODE_MESSAGE;
import static com.decathlon.ara.service.support.DtoConstants.CODE_PATTERN;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Wither
public class CommunicationDTO {

    @NotNull(message = "The code is required.")
    @Size(min = 1, max = 32, message = "The code is required and must not exceed {max} characters.")
    @Pattern(regexp = CODE_PATTERN, message = CODE_MESSAGE)
    private String code;

    @NotNull(message = "The name is required.")
    @Size(min = 1, max = 64, message = "The name is required and must not exceed {max} characters.")
    private String name;

    private CommunicationType type;

    private String message;

}
